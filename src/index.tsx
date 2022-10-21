import { Plugin, registerPlugin } from 'enmity/managers/plugins';
import { React } from 'enmity/metro/common';
import { create } from 'enmity/patcher';
import manifest from '../manifest.json';
import { View, Image, TouchableOpacity } from 'enmity/components';
import { Toasts } from 'enmity/metro/common';
import { wrapInHooks } from 'enmity/utilities';
import { getByName } from 'enmity/metro';

interface Badge {
  name: string;
  id: string;
  url: string;
}

const Patcher = create('badgedb');


const BadgeDB: Plugin = {
   ...manifest,

   onStart() {
      const Badges = getByName('ProfileBadges', { default: false });

      Patcher.after(Badges, 'default', (_, [{ user, isEnmity, ...rest }], res) => {
        if (isEnmity) return;
        const [badges, setBadges] = React.useState([]);
        React.useEffect(() => {
          try {
            this.fetchUserBadges(user.id).then(setBadges);
          } catch (e) {
            console.error(`Failed to request/parse badges for ${user.id}`);
          }
        }, []);
    
        if (!badges.length) return res;
        if (!res) {
          res = wrapInHooks(Badges.default)({
            user: new Proxy({}, {
              get: (_, prop) => {
                if (prop === 'flags') {
                  return -1;
                }
    
                if (prop === 'hasFlag') {
                  return () => true;
                }
    
                return user[prop];
              }
            }),
            isEnmity: true,
            ...rest
          });
    
          if (res?.props) {
            res.props.badges = [];
          }
        }
    
        if (!res) return res;
        res.props.badges.push(...badges.map(badge => <View
          key={badge}
          __enmity={true}
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            justifyContent: 'flex-end'
          }}
        >
          <Badge type={badge} />
        </View>));
    
        return res;
      });
    
      return Patcher.unpatchAll;
   },

   onStop() {
      Patcher.unpatchAll();
   },

   async fetchUserBadges(id: string): Promise<string[]> {

      const res = await fetch(BadgesDomain + id + '.json', {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }).then(r => r.json()).catch(() => []);
    
      return res;
    },
    
    Badge({ type }: { type: string; }): JSX.Element {
      const [badge, setBadge] = React.useState(null);
    
      React.useEffect(() => {
        try {
          this.fetchBadge(type).then(setBadge);
        } catch (e) {
          console.error(`Failed to get badge data for ${type}.`, e.message);
        }
      }, []);
    
      if (!badge?.url) {
        return null;
      }
    
      return <TouchableOpacity
        onPress={() => {
          Toasts.open({
            content: badge.name,
            source: { uri: badge.url }
          });
        }}
      >
        <Image
          source={{ uri: badge.url }}
          style={{
            width: 24,
            height: 24,
            resizeMode: 'contain',
            marginHorizontal: 2
          }}
        />
      </TouchableOpacity>;
    },
    
    async fetchBadge(type: string): Promise<Badge> {
    
      const res = await fetch(BadgesDomain + `data/${type}.json`, {
        headers: {
          'Cache-Control': 'no-cache'
        }
      }).then(r => r.json()).catch(() => { });
    
      return res;
    }
};

registerPlugin(BadgeDB);