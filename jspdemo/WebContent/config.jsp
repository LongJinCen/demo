<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>数据库配置</title>
</head>
<body>
	<%
	//进行最开始的数据库配置，并把con设置为全局可用
		request.setCharacterEncoding("GBK");
		String dbDriver = "com.mysql.jdbc.Driver";
		String dburl="jdbc:mysql://localhost:3306/emp?useSSL=false";
		String user_name = "root";
		String user_password="WAD241820";
		Class.forName(dbDriver);
		Connection con = null;
		con = DriverManager.getConnection(dburl, user_name, user_password);
		session.setAttribute("Mysql_con", con);
	%>
</body>
</html>