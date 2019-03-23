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
<title>登陆页面</title>
</head>
<body>
	<%
	//更具是否有缓存来填写相应的信息，和勾选相应的checkbox
		String account = "";
		String password = "";
		String account_check = "";
		String password_check = "";
		boolean flag = false;
		Cookie[] ck = request.getCookies();
		if(ck!=null){
			for(int x = 0; x<ck.length;x++){
				if("account".equals(ck[x].getName())){
					account = ck[x].getValue();
					account_check = "checked";
				}
				if("password".equals(ck[x].getName())){
					password = ck[x].getValue();
					password_check="checked";
				}
			}
		}
	%>
	<!-- 这里是表单内容，包括账户和密码的填写，还有复选框的勾选 -->
	<center>
		<form action="login_check.jsp">
			<h1>登陆页面</h1>
			<h2>用户名:</h2><input type="text" name="name" >
						<input type="checkbox" name="int1" <%=account_check %>>记住账户<br>
			<h2>用户密码:</h2><input type="text" name="password" >
							<input type="checkbox" name="int2" <%=password_check %>>记住密码<br>
			<input type="submit" value="登录">
			<a href="register.jsp"><input type="button" value="注册"></a>
		</form>
	</center>	

</body>
</html>