<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>删除雇员信息页面</title>
</head>
<body>
	<center>
		<h2>请输入要删除的雇员姓名和编号</h2><br>
		<form action="delete_check.jsp">
			<h2>姓名:</h2><input type="text" name="ename"><br>
			<h2>编号:</h2><input type="text" name="empno"><br>
			<input type="submit" value="点击删除">
			<input type="reset" value="重置">
		</form>
	</center>	

</body>
</html>