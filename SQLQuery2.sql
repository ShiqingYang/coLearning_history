use stuDatabase
select StuNo 学号,isTest 是否测试,danZhi 胆汁质,duoXue 多血质,nianYe 粘液质,yiYu 抑郁质 from personalityTest
update personalityTest
set isTest=1,danZhi=12,duoXue=15,nianYe=18,yiYu=32
where StuNo=1610010168