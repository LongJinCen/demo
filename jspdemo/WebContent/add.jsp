<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加雇员页面</title>
</head>
<body>
	<center>
		<h1>请输入以下信息</h1><br>
		<form action="add_check.jsp">
			雇员编号:<input type="text" name="empno"><br>
			雇员姓名:<input type="text" name="ename"><br>
			雇员工作:<input type="text" name="job"><br>
			雇佣日期:<input type="text" name="hiredate"><br>
			基本工资:<input type="text" name="sal"><br>
			基本奖金:<input type="text" name="comm"><br>
			<input type="submit" value="点击添加">
			<input type="reset" value="重置">
		</form>
	</center>	
	
</body>
</html>