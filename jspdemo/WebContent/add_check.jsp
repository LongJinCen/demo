<%@page import="java.sql.Statement"%>
<%@page import="java.sql.Connection"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>添加检查</title>
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
		if(empno!=""&&ename!=""&&job!=""&&hiredate!=""&&sal!=""&&comm!=""){
					String sql = "insert into emps(empno,ename,job,hiredate,sal,comm)"+
					"values('"+empno+"','"+ename+"','"+job+"','"+hiredate+"','"+sal+"','"+comm+"');";
					if(sql_statement.executeUpdate(sql)>0){
						out.println("<script>alert('添加成功');</script>");
						response.setHeader("refresh", "0;url=add.jsp");
						return ;
					}else{
						out.println("<script>alert('添加失败，请尝试重新添加');</script>");
						response.setHeader("refresh", "0;url=add.jsp");
						return ;
					}
		}else{
			out.println("<script>alert('请将信息输入完整');</script>");
			response.setHeader("refresh", "0;url=add.jsp");
		}
		%>						
</body>
</html>