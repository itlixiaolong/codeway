### 一：左右居中
- 当元素本身的 ```display：block```时，设置自身的margin-left和margin-right为auto即可
```
	<div class="parent">
		<div class="child">这是子元素</div>
	</div>
	
	<style>
	.parent {
		width: 400px;
		height: 400px;
		border: 1px solid red;
	}

	.child {
	    width：200px;
		display:block;
		margin：0 auto；
	}
	</style>
```
- 当元素本身的 ```display：inline-block```或者```display:inline```时，设置父元素为```text-align：center```即可
```
	<div class="parent">
		<div class="child">这是子元素</div>
	</div>
	
	<style>
	.parent {
		width: 400px;
		height: 400px;
		border: 1px solid red;
		text-align: center;
	}

	.child {
		width: 200px;
		display: inline-block;
	}
	</style>
```

### 二：垂直水平居中
- postion-->将父元素设置为```position：relative;```,将要居中的元素设置为```	position: absolute;left: 50%;top: 50%;transform: translate3d(-50%, -50%, 0);```即可

```
	<div class="parent">
		<div class="child">这是子元素</div>
	</div>
	
	<style>
    .parent {
		width: 400px;
		height: 400px;
		border: 1px solid red;
		position: relative;
	}

	.child {
		width: 200px;
		position: absolute;
		left: 50%;
		top: 50%;
		transform: translate3d(-50%, -50%, 0);
	}
	</style>
```
- flex-->将父元素设置为```display：flex;justify-content: center;align-items: center;```即可

```
	<div class="parent">
		<div class="child">这是子元素</div>
	</div>
	
	<style>
    .parent {
		width: 400px;
		height: 400px;
		border: 1px solid red;
	    display: flex;
    	justify-content: center;
		align-items: center;
	}

	.child {
		width: 200px;
	}
	</style>
```

- table-->将父元素设置为```display: table;```,将要居中的元素设置为```display: table-cell;text-align: center;vertical-align: middle;```即可

```
	<div class="parent">
		<div class="child">这是子元素</div>
	</div>
	
	<style>
    .parent {
		width: 400px;
		height: 400px;
		border: 1px solid red;
		display: table;
	}

	.child {
		width: 200px;
    	display: table-cell;
    	text-align: center;
    	vertical-align: middle;
	}
	</style>
```