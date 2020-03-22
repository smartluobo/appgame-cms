<template>

	<div style="padding: 50px;">
		<div style="width: 1000px;padding-bottom: 50px;">
		    <Steps :current="0">
		        <Step title="基本信息" icon="person-add"></Step>
		        <Step title="相关图片" icon="camera"></Step>
		        <Step title="完成" icon="email"></Step>
		    </Steps>
		</div>
    <Form :model="formItem" :label-width="80" ref="formItem" :rules ="rules">
		<Row>
			<Col span="5">
			  <FormItem label="分类名称" prop="typeValue">
				  <Input v-model="formItem.typeValue" placeholder="Enter name..." autocomplete="off"></Input>
			  </FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="序号" prop="serialNumber">
				   <Input v-model="formItem.serialNumber" placeholder="Enter appid..." autocomplete="off" ></Input>
			   </FormItem>
			</Col>
		</Row>
		
		<Row>
			<Col span="5">
			   <FormItem label="展示类型" prop="showType">
					<RadioGroup v-model="formItem.showType">
						<Radio label="1">宫格</Radio>
						<Radio label="2">列表</Radio>
					</RadioGroup>
				</FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="是否隐藏" prop="isHide">
					<RadioGroup v-model="formItem.isHide">
						<Radio label="1">显示</Radio>
						<Radio label="2">隐藏</Radio>
					</RadioGroup>
				</FormItem>
			</Col>
		</Row>
		
		<Row>
			
			
		
			
			<Col span="5">
			  <img src="../assets/logo.png">
			</Col>
		
		</Row>
	 
        <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')">下一步</Button>
            <Button style="margin-left: 8px" @click="goback">取消</Button>
        </FormItem>
    </Form>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    typeValue: '',
                    serialNumber: '',
                    showType: '',
                    isHide: '',
					typeLogo:''
                },
				rules:{
				  typeValue: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  serialNumber: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  showType: [
					{required: true, message: '必填',tirgger:'blur'}
				  ],
				  isHide: [
					{required: true, message: '必填'}
				  ],
				  typeLogo: [
					{required: true, message: '必填',tirgger:'blur'}
				  ]
				},
				props:['id'],
				defaultList: [],
				imgName: '',
				visible: false
            }
        },
		computed: {
			uploadList () {
				return this.$refs.upload ? this.$refs.upload.fileList : [];
			}
		},
		mounted(){
			var id = this.$route.params.id;
			var that = this;
			if(id !=undefined){
				that.handleType = "edit"
				this.https.fetchPost('/customerApp/contr/selectByPrimaryKey', {
				  id: id,        // 参数 firstName
				})
				.then(function (response) {
					that.formItem = response.data;
					console.log(that.formItem);
					
					let dataStr=response.data.typeId;  //原始字符串  
					    let dataStrArr=dataStr.split(",");  //分割成字符串数组  
					    let dataIntArr=[];//保存转换后的整型字符串  
					    //方法一  
					    dataStrArr.forEach(item => {  
					        dataIntArr.push(+item);  
					    });  
					  
					that.formItem.typeId =dataIntArr;
				})
				.catch(function (error) {
				  console.log(error);
				});
			}
		 },
		created: function () {
			   var that = this;
			   this.https.fetchPost('/customerApp/contr/getBoxList', {
				  idBox: "1",        // 参数 firstName
				})
				.then(function (response) {
					that.boxList = response.data.boxList;
					that.typeList = response.data.typeList;
				})
				.catch(function (error) {
				  console.log(error);
				});
		 },
		 methods:{
			 handleSubmit (name) {
			 	var that = this;
				if(that.handleType == "edit"){
					this.https.fetchPost('/customerApp/contr/edit_customer_app',that.formItem)
					 .then(function (response) {
						console.log(response.data)
						if(response.data.code =="200"){
							/* that.$Message.success('修改成功!'); */
							that.$router.push({name:'customerAddImages',params:{'id':that.formItem.id,"logo":that.formItem.logo}});
						}
					 })
					 .catch(function (error) {
					   console.log(error);
					 });
				}else{
					this.https.fetchPost('/customerApp/contr/addCustomerApp',that.formItem)
					 .then(function (response) {
						 console.log(response.data);
						if(response.data.code =="SUCCESS"){
							that.$Message.success('添加成功!');
							that.$router.push({name:'customerAddImages',params:{'id':response.data.id,"logo":""}});
						}
					 })
					 .catch(function (error) {
					   console.log(error);
					 });
				}
			 	
			 },
			 goback(){
				 this.$router.go(-1);
			 }
		 }
		
    }
</script>
