/** @format */
import { ObjectStoreInUrl } from "network-spanner";
import { Schemas, HandleTable } from "general-basic-indexdb";
const { handleData, getData } = HandleTable;
const { formSchema } = Schemas;


export const makeParamsByType = async (params, vm) => {
  if (vm.parametersType === "url") {
    params = {
      ...ObjectStoreInUrl.queryToData(vm.$route?.query),
      ...params,
    };
  }

  if (vm.parametersType === "indexDB") {
    const DBParams = await getData({
      tableName: "formParams",
      propertiesKey: vm.$route.path || "defQueryParams",
      primaryKey: "default",
      mapDB: formSchema,
    });
    params = {
      ...DBParams,
      ...params,
    };
  }
  console.log(params)
  return params;
};

export const saveParamsByType = async (params, vm) => {
  if (vm.parametersType === "url") {
    await vm.$router.push({
      query: ObjectStoreInUrl.paramsToQuery({ ...params }),
    });
  }
  if (vm.parametersType === "indexDB") {
    await handleData({
      tableName: "formParams",
      propertiesKey: vm.$route.path || "defQueryParams",
      parameter: { ...params },
      primaryKey: "default",
      mapDB: formSchema,
    });
  }
  return;
};