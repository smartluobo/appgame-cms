<template>
	<div style="padding: 50px;">
    <Form :model="formItem" :label-width="80" ref="formItem">
		<Row>
			<Col span="5">
			  <FormItem label="名字">
				  <Input v-model="formItem.title" placeholder="Enter name..."></Input>
			  </FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="appId">
				   <Input v-model="formItem.appId" placeholder="Enter appid..."></Input>
			   </FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="5">
			  <FormItem label="key">
				  <Input v-model="formItem.param4" placeholder="Enter param4..."></Input>
			  </FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="unitId">
				   <Input v-model="formItem.unitId" placeholder="Enter unitId..."></Input>
			   </FormItem>
			</Col>
		</Row>
		<Row>
			<Col span="5">
			   <FormItem label="是否盒子">
					<RadioGroup v-model="formItem.isBox">
						<Radio label="1">是</Radio>
						<Radio label="0">否</Radio>
					</RadioGroup>
				</FormItem>
			</Col>
			
			<Col span="5">
			   <FormItem label="状态">
					<RadioGroup v-model="formItem.isShow">
						<Radio label="0">审核</Radio>
						<Radio label="1">通过</Radio>
					</RadioGroup>
				</FormItem>
			</Col>
		</Row>
     
        <FormItem label="描述">
			<Col span="9">
            <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" 
			placeholder="Enter description..."></Input>
			</Col>
		</FormItem>
        <FormItem>
            <Button type="primary" @click="handleSubmit('formItem')">提交</Button>
            <Button style="margin-left: 8px" @click="back()" >取消</Button>
        </FormItem>
    </Form>
	</div>
</template>
<script>
    export default {
        data () {
            return {
                formItem: {
                    name: '',
                    appId: '',
                    desc: '',
                    isBox: '',
					id:"",
					isShow:'',
					title:'',
					description:'',
					unitId:'',
					key:'',
					param4:''
                }
            }
        },
		mounted() {
		},
		created: function () {
			var that = this;
			var id = this.$route.params.id;
			console.log(id);
			if(id !=undefined){
				this.https.fetchPost('/config/contr/getConfigObject', {
				  id: id,        // 参数 firstName
				})
				.then(function (response) {
					that.formItem = response.data;
					//console.log(that.formItem.isShow+"");
					that.formItem.isShow = response.data.isShow + "";
					that.formItem.isBox = response.data.isBox + "";
				})
				.catch(function (error) {
				  console.log(error);
				});
			}
			  
		 },
		 methods:{
			 handleSubmit (name) {
			 	var that = this;
			 	console.log(this.formItem.appid)
			 	this.https.fetchPost('/config/contr/editConfig', this.formItem)
			 	 .then(function (response) {
					 if(response.data.code = "200"){
						  that.$Message.success(response.data.message);
						   that.$router.push({name:'myApp'});
					 }
					
			 					
			 	 })
			 	 .catch(function (error) {
			 	   console.log(error);
			 	 });
			 },
			 back(){
			         this.$router.go(-1);//返回上一层
			 }
		 }
    }
</script>
