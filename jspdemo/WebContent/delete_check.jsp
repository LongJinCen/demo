<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>删除检查</title>
</head>
<body>
	<%
	//更具信息进行数据库操作
		request.setCharacterEncoding("GBK");
		Connection con = (Connection)session.getAttribute("Mysql_con");
		Statement sql_statement = con.createStatement();
		String empno = request.getParameter("empno");
		String ename = request.getParameter("ename");
		if(empno==""||ename==""){
			out.println("<script>alert('请将信息输入完整');</script>");
			response.setHeader("refresh", "0;url=delete.jsp");
			return ;
		}
		String sql = "delete from emps where empno = '"+empno+"' and ename = '"+ename+"' ;";
		if(sql_statement.executeUpdate(sql)>0){
			out.println("<script>alert('删除成功');</script>");
			response.setHeader("refresh", "0;url=delete.jsp");
			return ;
		}else{
			out.println("<script>alert('删除失败');</script>");
			response.setHeader("refresh", "0;url=delete.jsp");
		}
	%>
</body>
</html>