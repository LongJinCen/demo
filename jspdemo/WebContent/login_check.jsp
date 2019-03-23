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
<title>登陆检查页面</title>
</head>
<body>

	<%
		String check_boxs1 = request.getParameter("int1");
		String check_boxs2 = request.getParameter("int2");
		if(check_boxs1=="on"&&check_boxs2=="on"){
			Cookie ck1 = new Cookie("account",request.getParameter("name"));
			Cookie ck2 = new Cookie("password",request.getParameter("password"));
			ck1.setMaxAge(300);
			ck2.setMaxAge(300);
			response.addCookie(ck1);
			response.addCookie(ck2);
		}else if(check_boxs1=="on"&&check_boxs2!="on"){
			Cookie ck1 = new Cookie("account",request.getParameter("name"));
			ck1.setMaxAge(300);
			response.addCookie(ck1);
		}else if(check_boxs1!="on"&&check_boxs2=="on"){
			Cookie ck1 = new Cookie("account",request.getParameter("name"));
			ck1.setMaxAge(300);
			response.addCookie(ck1);
		}
	%>
	<%
	//如果没有缓存则更具姓名去数据库查找
		String account = request.getParameter("name");
		String password = request.getParameter("password");	
		System.out.println("ve"+account+password+"evev");
		boolean flag1 = false;
		boolean flag2 = false;
		Connection con = (Connection)session.getAttribute("Mysql_con");
		Statement st = con.createStatement();
		String  sql = "select * from account where name = '" +account+"' ;";
		ResultSet rs = st.executeQuery(sql);
		if(account==""&&password!=""){
			out.println("<script>alert('请先输入账户');</script>");
			response.setHeader("refresh", "0;url=login.jsp");
		}else if(account==""&&password==""){
			out.println("<script>alert('请先输入账户和密码');</script>");
			response.setHeader("refresh", "0;url=login.jsp");
		}else if(account!=""&&password==""){
			out.println("<script>alert('请先输入密码');</script>");
			response.setHeader("refresh", "0;url=login.jsp");
		}else if(account!=""&&password!=""){
			while(rs.next()){
				if(account.equals(rs.getString(2))&&password.equals(rs.getString(1))){
					flag2 = true;
					flag1 = true;
				}else if(account.equals(rs.getString(2))){
					flag2 = true;
				}else if(password.equals(rs.getString(1))){
					flag1 = true;
				}
			}
		//三种登陆会出现的情况，最后一个代表账户和密码输入正确，直接跳转到management页面
			
			if(flag2==true&&flag1==false){
				out.println("<script>alert('密码错误,请重新输入');</script>");
				response.setHeader("refresh", "0;url=login.jsp");
			}else if(flag2==false){
				out.println("<script>alert('用户不存在，重新输入或者注册');</script>");
				response.setHeader("refresh", "0;url=login.jsp");
	%>
		<%
			}else if(flag2==true&&flag1==true){
		%>
			<jsp:forward page="management.jsp"/>
		<%
			}
		}
		%>
</body>
</html>