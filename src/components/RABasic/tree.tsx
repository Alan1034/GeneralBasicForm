/*
 * @Author: 陈德立*******419287484@qq.com
 * @Date: 2025-11-28 11:45:15
 * @LastEditTime: 2025-11-29 16:39:37
 * @LastEditors: 陈德立*******419287484@qq.com
 * @Github: https://github.com/Alan1034
 * @Description: https://ant.design/components/tree-cn
 * @FilePath: /GeneralBasicForm/src/components/RABasic/tree.tsx
 * 
 */

import { useContext, useId, useEffect } from 'react';
import { Tree } from 'antd';
import type { TreeDataNode, TreeProps } from 'antd';
import { FormContext } from "../FormContext";

export const ATree = (props) => {
  const { item = {}, id = useId() } = props
  const {
    setting = {},
    options = [],
  } = item
  const { closeCombobox } = setting
  const { dispatchQueryParams, queryParams, formLoading, } = useContext(FormContext);
  useEffect(() => {
    if (!(queryParams[item.prop] instanceof Array)) {
      console.error("Tree value must be an array，树的值必须为数组类型")
      dispatchQueryParams({ data: { ...queryParams, [item.prop]: [queryParams[item.prop]] } })
    }
  }, [queryParams[item.prop]])
  const treeData = (dataList = []): TreeDataNode[] => {
    if (!dataList) return []
    if (dataList.length === 0) {
      return []
    }
    return (
      dataList.map((item) => {
        const { setting = {} } = item
        return ({
          ...item,
          ...setting,
          title: item.label || item.title,
          key: item.value || item.key,
          children: treeData(item.children),
        })
      })
    )
  }
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: selectedKeys } })
    if (closeCombobox) {
      closeCombobox()
    }
  };

  const onCheck: TreeProps['onCheck'] = (checkedKeys, info) => {
    dispatchQueryParams({ data: { ...queryParams, [item.prop]: checkedKeys } })
  };
  if (!(queryParams[item.prop] instanceof Array)) {
    return []
  }
  return (
    options?.length ? (
      <Tree
        id={id}
        name={item.prop}
        value={queryParams[item.prop] || []}
        checkedKeys={queryParams[item.prop] || []}
        selectedKeys={queryParams[item.prop] || []}
        defaultExpandedKeys={queryParams[item.prop] || []}
        disabled={formLoading}
        onCheck={onCheck}
        onSelect={onSelect}
        treeData={treeData(options)}
        {...setting}
        styles={{
          root: {
            backgroundColor: 'inherit'
          },
          ...setting?.styles,
        }}
      >
        {props.children}
      </Tree>
    ) : (
      'loading tree'
    )
  )
}