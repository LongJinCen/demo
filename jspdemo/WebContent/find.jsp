<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.PreparedStatement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>查找雇员信息页面</title>
</head>
<body>
	<center>
		<h1>请输入要查询的雇员信息然后点击点击查询(姓名和编号必填)</h1><br>
		<form action="find_check.jsp">
			雇员编号:<input type="text" name="empno"><br>
			雇员姓名:<input type="text" name="ename"><br>
			<input type="submit" value="点击查询">
			<input type="reset" value="重置">
		</form>
	</center>	
</body>
</html>