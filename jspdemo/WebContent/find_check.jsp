<%@page import="java.sql.ResultSet"%>
<%@page import="java.sql.Statement"%>
<%@page import="java.sql.DriverManager"%>
<%@page import="java.sql.Connection"%>
<%@page import="java.sql.PreparedStatement"%>
<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>信息查找结果页面</title>
</head>
<body>
	<%
	//更具信息进行数据库操作
		request.setCharacterEncoding("GBK");
		String empno = request.getParameter("empno");
		String ename = request.getParameter("ename");
		if(empno==""){
	%>
			<script type="text/javascript" language="javascript">
	 		alert("请先输入用户编号");
	 		window.document.location.href="find.jsp";
			 </script> 
	<%
		}else if(empno!=""&&ename==""){
	%>
			<script type="text/javascript" language="javascript">
	 		alert("请输入雇员姓名");
	 		window.document.location.href="find.jsp";
			 </script> 
	<%
		}
	%>
	<%
		boolean flag1 = false;
		String job = "";
		String hiredate ="";
		String sal = "";
		String comm = "";
		Connection con = (Connection)session.getAttribute("Mysql_con");
		String sql = "select * from emps where empno = '"+empno+"' ;";
		PreparedStatement sql_statement = con.prepareStatement(sql);	
		ResultSet rs=sql_statement.executeQuery();
		while(rs.next()){
			if(empno.equals(rs.getString(1))&&ename.equals(rs.getString(2))){
				flag1 = true;
				job = rs.getString(3);
				hiredate = rs.getString(4);
				sal = rs.getString(5);
				comm = rs.getString(6);
			}
		}
		if(!flag1){
	%>
		<script type="text/javascript" language="javascript">
	 		alert("未找到你要查询的雇员，请检查信息是否输入正确");
	 		window.document.location.href="find.jsp";
		 </script> 
	<%
		}
	%>
	
	<center>
		<table border="1" width="500" height="300">
			<tr>
				<td>雇员编号:<%=empno%></td>
				<td>雇员姓名:<%=ename%></td>
			</tr>
			<tr>
				<td>雇员工作:<%=job%></td>
				<td>雇佣日期:<%=hiredate%></td>
			</tr>
			<tr>
				<td>基本工资:<%=sal%></td>
				<td>奖金:<%=comm%></td>
			</tr>
		</table>	
	</center>	
</body>
</html>