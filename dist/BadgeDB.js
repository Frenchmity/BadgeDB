function w(e){window.enmity.plugins.registerPlugin(e)}window.enmity.modules.common.Constants,window.enmity.modules.common.Clipboard,window.enmity.modules.common.Assets,window.enmity.modules.common.Messages,window.enmity.modules.common.Clyde,window.enmity.modules.common.Avatars,window.enmity.modules.common.Native;const m=window.enmity.modules.common.React;window.enmity.modules.common.Dispatcher,window.enmity.modules.common.Storage;const y=window.enmity.modules.common.Toasts;window.enmity.modules.common.Dialog,window.enmity.modules.common.Token,window.enmity.modules.common.REST,window.enmity.modules.common.Settings,window.enmity.modules.common.Users,window.enmity.modules.common.Navigation,window.enmity.modules.common.NavigationNative,window.enmity.modules.common.NavigationStack,window.enmity.modules.common.Theme,window.enmity.modules.common.Linking,window.enmity.modules.common.StyleSheet,window.enmity.modules.common.ColorMap,window.enmity.modules.common.Components,window.enmity.modules.common.Locale,window.enmity.modules.common.Profiles,window.enmity.modules.common.Lodash,window.enmity.modules.common.Logger,window.enmity.modules.common.Flux,window.enmity.modules.common.SVG,window.enmity.modules.common.Scenes,window.enmity.modules.common.Moment;function h(e){return window.enmity.patcher.create(e)}var g="BadgeDB",p="1.0.0",f="Badge yourself up",F=[{name:"French Cat",id:"811770910624579584"}],S={name:g,version:p,description:f,authors:F};const{components:o}=window.enmity;o.Alert,o.Button,o.FlatList;const b=o.Image;o.ImageBackground,o.KeyboardAvoidingView,o.Modal,o.Pressable,o.RefreshControl,o.ScrollView,o.SectionList,o.StatusBar,o.StyleSheet,o.Switch,o.Text,o.TextInput,o.TouchableHighlight;const B=o.TouchableOpacity;o.TouchableWithoutFeedback,o.Touchable;const C=o.View;o.VirtualizedList,o.Form,o.FormArrow,o.FormCTA,o.FormCTAButton,o.FormCardSection,o.FormCheckbox,o.FormDivider,o.FormHint,o.FormIcon,o.FormInput,o.FormLabel,o.FormRadio,o.FormRow,o.FormSection,o.FormSelect,o.FormSubLabel,o.FormSwitch,o.FormTernaryCheckBox,o.FormText,o.FormTextColors,o.FormTextSizes;function T(e){return window.enmity.utilities.wrapInHooks(e)}function v(...e){return window.enmity.modules.getByName(...e)}window.enmity.modules.common;const c=h("badges"),x={...S,onStart(){const e=v("ProfileBadges",{default:!1});return c.after(e,"default",(n,[{user:i,isEnmity:s,...l}],t)=>{if(s)return;const[d,u]=m.useState([]);return m.useEffect(()=>{try{this.fetchUserBadges(i.id).then(u)}catch{console.error(`Failed to request/parse badges for ${i.id}`)}},[]),!d.length||(t||(t=T(e.default)({user:new Proxy({},{get:(r,a)=>a==="flags"?-1:a==="hasFlag"?()=>!0:i[a]}),isEnmity:!0,...l}),t!=null&&t.props&&(t.props.badges=[])),!t)||t.props.badges.push(...d.map(r=>m.createElement(C,{key:r,__enmity:!0,style:{alignItems:"center",flexDirection:"row",justifyContent:"flex-end"}},m.createElement(Badge,{type:r})))),t}),c.unpatchAll},onStop(){c.unpatchAll()},async fetchUserBadges(e){return await fetch(BadgesDomain+e+".json",{headers:{"Cache-Control":"no-cache"}}).then(n=>n.json()).catch(()=>[])},Badge({type:e}){const[n,i]=m.useState(null);return m.useEffect(()=>{try{this.fetchBadge(e).then(i)}catch(s){console.error(`Failed to get badge data for ${e}.`,s.message)}},[]),n!=null&&n.url?m.createElement(B,{onPress:()=>{y.open({content:n.name,source:{uri:n.url}})}},m.createElement(b,{source:{uri:n.url},style:{width:24,height:24,resizeMode:"contain",marginHorizontal:2}})):null},async fetchBadge(e){return await fetch(BadgesDomain+`data/${e}.json`,{headers:{"Cache-Control":"no-cache"}}).then(n=>n.json()).catch(()=>{})}};w(x);