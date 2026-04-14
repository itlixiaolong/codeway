```javascript
function _getRealData(path,realData){
  const  arr=path.split('.')
  return (realData)=>{
    if(!realData){
      return '_'
    }
    arr.forEach(item=>{
      if(/\[(\d)\]/.test(item)){
        const key=item.split('[')[0]
        realData=realData[key][RegExp.$1]
      }else{
        realData=realData[item]
      }
    })
    return realData
  }
}
const a={
  b:{
    c:124,
    d:[
      {
        aa:122
      },
      {
        cc:456
      }
    ]
  }
}
console.log(_getRealData('b.c')(a)); //124
console.log(_getRealData('b.d[1].cc')(a));//456
```

