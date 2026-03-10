import type { TreeDataNode } from 'antd';
export const treeData = (dataList = []): TreeDataNode[] => {
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