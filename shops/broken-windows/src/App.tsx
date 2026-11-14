
import Status from "./components/Status"; 
import Storefront from "./components/StoreFront.tsx";
import { useThemeStore } from "./hooks/useThemeStore.ts";
import { useCatalog } from "./hooks/useCatalog.ts";
import DocumentTitle from "./components/DocumentTitle.tsx";
export default function App() {
  const theme=useThemeStore((t)=>t.theme)
  const {state , retry} = useCatalog();
  return (
  
    <div className="app" data-theme={theme}> 
    <DocumentTitle />
   {state.status === "success" ? (<Storefront data={state}/>):(

     <Status state={state} onRetry={retry}/>)}
    
  </div>
    );


}
