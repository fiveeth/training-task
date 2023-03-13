## 1 合约
略
## 2 测试
![](./assets/images/test.png)
## 3 部署
合约地址：0x0C415Ef7db04C5483115d8e859ac8EcbDB9c1ea2
![](./assets/images/deploy.png)
![](./assets/images/deploy-success.png)
## 4 验证
![](./assets/images/verify-success1.png)
![](./assets/images/verify-success2.png)
## 5 错误记录
1. 错误一：
![](./assets/images/error.png)
原因：.env文件结尾不需要添加分号
2. 错误二：出现connect timeout  
![](./assets/images/verify-error1.png)
解决：  
![](./assets/images/solve1.png)  
接着又出现新的错误：    
![](./assets/images/verify-error2.png)  
解决：https改为http   
![](./assets/images/solve2.png)  
详情参考了：  
https://github.com/NomicFoundation/hardhat/issues/2348  
https://github.com/smartcontractkit/full-blockchain-solidity-course-js/discussions/2247#discussioncomment-3590929