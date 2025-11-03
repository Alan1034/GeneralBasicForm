import { Tabs as RTabs } from './R-tabs';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../ui/tabs"
export const BaseTabs = (props) => {
  return (
    <RTabs {...props} coms={{
      Tabs, TabsContent, TabsList, TabsTrigger
    }}>
    </RTabs>
  );
}