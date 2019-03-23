<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>注册检查</title>
</head>
<body>
	<%
		//设置编码，然后取得全局的con，然后更具填入的信息，使用sql语句将账户插入到account表中
		request.setCharacterEncoding("GBK");
		Connection con = (Connection)session.getAttribute("Mysql_con");
		Statement sql_statement = con.createStatement();
		String name = request.getParameter("name");
		String password = request.getParameter("password"); 
		String sql = "insert into account(name,password)values('"+name+"','"+password+"');";
		if(name!=""&&password!=""){
			if(sql_statement.executeUpdate(sql)>0){
				out.print("<script>alert('注册成功');</script>");
				response.setHeader("refresh", "0;url=login.jsp");
		}else{
			out.print("<script>alert('输入不正确，请输入完整的信息,三秒后将跳转到注册页面');</script>");
			response.setHeader("refresh", "3;url=register.jsp");
		}		
	%>
</body>
</html>