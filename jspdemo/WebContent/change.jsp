<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>修改雇员信息页面</title>
</head>
<body>
		<center>
		<h1>请输入要修改的相应信息然后点击修改(姓名和编号必填)</h1><br>
		<form action="change_check.jsp">
			雇员编号:<input type="text" name="empno"><br>
			雇员姓名:<input type="text" name="ename"><br>
			雇员工作:<input type="text" name="job"><br>
			雇佣日期:<input type="text" name="hiredate"><br>
			基本工资:<input type="text" name="sal"><br>
			基本奖金:<input type="text" name="comm"><br>
			<input type="submit" value="点击修改">
			<input type="reset" value="重置">
		</form>
	</center>
	
</body>
</html>