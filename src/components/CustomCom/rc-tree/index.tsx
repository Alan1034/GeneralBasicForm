/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2025-11-26 17:06:42
 * @LastEditTime: 2025-11-28 15:15:17
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: https://github.com/react-component/tree
 * @FilePath: /GeneralBasicForm/src/components/CustomCom/rc-tree/index.tsx
 * 
 */

import { useContext, useId } from 'react';
// import Tree, { TreeNode } from 'rc-tree';
import Tree from 'rc-tree';
import { FormContext } from "../../BasicForm";
import "rc-tree/assets/index.css"
export const RcTree = (props) => {
  const { item = {}, id = useId() } = props
  const {
    setting = {},
    options = [{
      label: '',
      value: '',
      children: []
    }],
  } = item
  const { dispatchQueryParams, queryParams, formLoading, } = useContext(FormContext);
  // const renderTreeChildren = (dataList = []) => {
  //   if (!dataList) return []
  //   if (dataList.length === 0) {
  //     return []
  //   }
  //   return (
  //     dataList.map((item) => {
  //       const { setting = {} } = item
  //       return (
  //         <TreeNode title={item.label || item.title}
  //           key={item.value || item.key}
  //           {...setting}>
  //           {renderTreeChildren(item.children)}
  //         </TreeNode>
  //       )
  //     })
  //   )
  // }
  const treeData = (dataList = []) => {
    if (!dataList) return []
    if (dataList.length === 0) {
      return []
    }
    return (
      dataList.map((item) => {
        const { setting = {} } = item
        return ({
          ...setting,
          title: item.label || item.title,
          key: item.value || item.key,
          children: treeData(item.children),
        })
      })
    )
  }
  return (
    options?.length ? (<Tree
      id={id}
      name={item.prop}
      value={queryParams[item.prop] || ""}
      checkedKeys={queryParams[item.prop] || ""}
      selectedKeys={queryParams[item.prop] || ""}
      disabled={formLoading}
      onCheck={(checkedKeys, e) => {
        dispatchQueryParams({ data: { ...queryParams, [item.prop]: checkedKeys } })
      }}
      onSelect={(selectedKeys, e) => {
        dispatchQueryParams({ data: { ...queryParams, [item.prop]: selectedKeys } })
      }}
      treeData={treeData(options)}
      {...setting}>
      {props.children}
    </Tree>) : (
      'loading tree'
    )
  )
}