<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>主页，管理页面</title>
</head>
<body>
<center>
	<%
	//设置编码
		request.setCharacterEncoding("GBK");
	//获取checkbox的信息,更具选项进行信息保存，方便在主页里面下次使用
		String rem_account = request.getParameter("int1");
		String rem_password = request.getParameter("int2");
		if(rem_account!=null&&rem_password==null){
			Cookie c1 = new Cookie("account",rem_account);
			response.addCookie(c1);
			c1.setMaxAge(3000);
		}else if(rem_account!=null&&rem_password!=null){
			Cookie c1 = new Cookie("account",rem_account);
			Cookie c2 = new Cookie("password",rem_password);
			c1.setMaxAge(3000);
			c2.setMaxAge(3000);
			response.addCookie(c1);
			response.addCookie(c2);		
		}
	%>
	<h1>欢迎来到员工管理页面</h1>
	<table border="1" width="1000">
		<tr>
			<td><a href = "add.jsp">添加雇员</a></td>
			<td><a href = "find.jsp">查询雇员</a></td>
			<td><a href = "change.jsp">修改雇员</a></td>
			<td><a href = "delete.jsp">删除雇员</a></td>
		</tr>
	</table>
</center>
</body>
</html>