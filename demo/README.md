#### 初次渲染预选项 [2,3,8] 
> 模拟后端返回数据中已经被选中的状态

#### 在页面即将被挂载时根据预选项更改列表数组中的选中状态 => 页面渲染
> 使用hook函数 `componentWillMount`

#### 整个数据交互中共3个核心Data: `preSelected`,`listItems`,`selectList`
> - preSelected: 预选项
> - listItems: 渲染数据列表（通过Array方法生成的35个有序数据）
> - selectList: 已选中数据列表

#### 1个核心Method：handleClick
> 判断点击目标
> 选中/取消后 样式切换
> 选中/取消后 数据状态切换
> 选中/取消后 selectList的增删
> 选中/取消后 selectList长度判断（若大于10，则取消最初选中的item的选中状态）

----

> export-button点击后打印 selectList到控制台，如果需要导出txt或json格式文件，则需要第三方组件(nodejs)的支持