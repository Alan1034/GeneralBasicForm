import { useState, useEffect } from 'react';
import { Schemas, HandleTable } from "general-basic-indexdb"
const { formSchema } = Schemas;
const { getData } = HandleTable
import { ObjectStoreInUrl, HandleParamsData } from "network-spanner"
const defProps = {
  coms: {
    Tabs: [], TabsContent: [], TabsList: [], TabsTrigger: []
  },
  getList: () => { },
  parametersType: "url",
  DBPrimaryKey: null,
  tabPanes: [],
  activeValueKey: "tabsActiveValue"
}
export const Tabs = (prop) => {
  const props = { ...defProps, ...prop };
  const { coms, children, tabPanes, defActiveValue, activeValueKey, getList, parametersType, DBPrimaryKey } = props
  const { Tabs, TabsContent, TabsList, TabsTrigger } = coms

  useEffect(() => {
    if (defActiveValue) {
      setActiveValue(defActiveValue)
    }
  }, [defActiveValue])
  useEffect(() => {
    setActiveValue(activeValueInit())
  }, [])
  const valueChange = async (value) => {
    const searchParams = await HandleParamsData.makeParamsByType({
      [activeValueKey]: value,
    }, props)
    await getList({
      ...searchParams,
    });
    await HandleParamsData.saveParamsByType(searchParams, props)
    setActiveValue(value)
  }
  const activeValueInit = () => {
    let activeValue = ''
    if (tabPanes[0]?.value) {
      activeValue = tabPanes[0]?.value
    }
    const urlactiveValue = ObjectStoreInUrl.queryToData(ObjectStoreInUrl.getURLParameter({ decode: true }))[activeValueKey]

    if (parametersType === "url" && urlactiveValue) {
      activeValue = urlactiveValue
    }
    if (parametersType === "indexDB") {
      getData(
        {
          tableName: "formParams",
          propertiesKey: window.location.pathname || "defQueryParams",
          primaryKey: DBPrimaryKey || "default",
          mapDB: formSchema
        }, (DBParams) => {
          const activeValue = DBParams?.[activeValueKey]
          if (activeValue) {
            setActiveValue(DBParams?.[activeValueKey])
          }
        }
      )

    }
    if (defActiveValue) {
      activeValue = defActiveValue
    }
    return `${activeValue}`
  }
  const [activeValue, setActiveValue] = useState("");
  return (
    <Tabs value={activeValue} onValueChange={valueChange}>
      <TabsList>
        {tabPanes.map((tabPane, index) => (
          <TabsTrigger key={tabPane.value} value={tabPane.value}>{tabPane.label}</TabsTrigger>
        ))}
      </TabsList>
      {tabPanes.map((tabPane, index) => (
        <TabsContent key={tabPane.value} value={tabPane.value}>{
          tabPane.render() ? tabPane.render(tabPane, index) : []
        }</TabsContent>
      ))}
      {children}
    </Tabs>
  );
}