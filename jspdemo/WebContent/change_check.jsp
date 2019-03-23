<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改操作</title>
</head>
<body>
	<%
	//更具信息进行数据库操作
		request.setCharacterEncoding("GBK");
		Connection con = (Connection)session.getAttribute("Mysql_con");
		Statement sql_statement = con.createStatement();
		String empno = request.getParameter("empno");
		String ename = request.getParameter("ename");
		String job = request.getParameter("job");
		String hiredate = request.getParameter("hiredate");
		String sal = request.getParameter("sal");
		String comm = request.getParameter("comm");
		String sql = "update emps set job = '";
		boolean flag = false;
		if(empno!=""&&ename!=""){
			if(job!=""){
				sql = sql + job + "'" +" where empno = '"+empno+"' ;";
				if(sql_statement.executeUpdate(sql)>0){
					flag = true;
				}
				 sql = "update emps set job = '";
			}
			if(hiredate!=""){
				sql = sql + hiredate + "'" +" where empno = '"+empno+"' ;";
				if(sql_statement.executeUpdate(sql)>0){
					flag = true;
				}
				 sql = "update emps set job = '";
			}
			if(sal!=""){
				sql = sql + sal + "'" +" where empno = '"+empno+"' ;";
				if(sql_statement.executeUpdate(sql)>0){
					flag = true;
				}
				 sql = "update emps set job = '";
			}
			if(comm!=""){
				sql = sql + comm + "'" +" where empno = '"+empno+"' ;";
				if(sql_statement.executeUpdate(sql)>0){
					flag = true;
				}
				 sql = "update emps set job = '";
			}
			if(flag==true){
				out.println("<script>alert('修改成功');</script>");
				response.setHeader("refresh", "0;url=change.jsp");
				return ;				
			}else{
				out.println("<script>alert('没找到用户请重新输入');</script>");
				response.setHeader("refresh", "0;url=change.jsp");
				return ;
			}
		}else{
			out.println("<script>alert('请将姓名和编号一并输入');</script>");
			response.setHeader("refresh", "0;url=change.jsp");
		}
	%>
</body>
</html>