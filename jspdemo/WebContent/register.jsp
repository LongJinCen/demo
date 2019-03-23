<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>注册页面</title>
</head>
<body>
<!-- 表单信息 -->
	<center>
		<h1>请输入以下信息</h1><br>
		<form action="register_check.jsp">
			<h1>注册页面</h1>
			<h2>用户名:</h2><input type="text" name="name"><br>
			<h2>设置密码:</h2><input type="text" name="password"><br>
			<input type="submit" value="注册" >
		</form>
	</center>	
	
</body>
</html>