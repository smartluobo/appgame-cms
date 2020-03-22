<template>
	<div style="padding: 50px;">
		<div style="width: 800px;">
		    <Steps :current="1">
		        <Step title="基本信息" icon="person-add"></Step>
		        <Step title="相关图片" icon="camera"></Step>
		        <Step title="完成" icon="email"></Step>
		    </Steps>
		</div>
		
		
		<div>
			<div style="float: left;padding-top:40px;padding-right: 20px;">LOGO : </div>
			
			<div class="demo-upload-list" v-if="item.status === 'finished'" v-for="item in uploadList">
					<img :src="item.url" style="float: left;">
					<div class="demo-upload-list-cover">
						<Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
						<Icon type="ios-trash-outline" @click.native="handleRemove('1')"></Icon>
					</div>
			</div>
			<div class="demo-upload-list" v-else>
				<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
			</div>
			
			
			<Upload
				ref="upload"
				:show-upload-list="false"
				:default-file-list="defaultList"
				:on-success="handleSuccess"
				:format="['jpg','jpeg','png','gif']"
				:max-size="2048"
				:on-format-error="handleFormatError"
				:on-exceeded-size="handleMaxSize"
				:before-upload="handleBeforeUpload"
				multiple
				type="drag"
				action="http://120.25.250.175:8088/customerApp/contr/uploadImg"
				style="display: inline-block;width:80px;padding-top: 10px;">
				<div style="width: 80px;height:80px;line-height: 80px;float:left;">
					<Icon type="ios-camera" size="20"></Icon>
				</div>
			</Upload>
			
			
			<div>logo路径 : <span> {{logo}} </span></div>
		</div>
		
		
		
		
		<div style="padding-top: 50px;">
			<div style="float: left;padding-top:40px;padding-right: 20px;">轮播图: </div>
			
			<div class="demo-upload-list" v-if="item.status === 'finished'" v-for="item in banerList" style="width: 200px;">
					<img :src="item.url" style="float: left;width: 200px;">
					<div class="demo-upload-list-cover">
						<Icon type="ios-eye-outline" @click.native="handleView(item.url)"></Icon>
						<Icon type="ios-trash-outline" @click.native="handleRemove('2')"></Icon>
					</div>
			</div>
			<div class="demo-upload-list" v-else>
				<Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
			</div>
			
			
			<Upload
				ref="upload"
				:show-upload-list="false"
				:default-file-list="defaultList"
				:on-success="handleSuccess1"
				:format="['jpg','jpeg','png','gif']"
				:max-size="2048"
				:on-format-error="handleFormatError"
				:on-exceeded-size="handleMaxSize"
				:before-upload="handleBeforeUpload1"
				multiple
				type="drag"
				action="http://120.25.250.175:8088/customerApp/contr/uploadImg"
				style="display: inline-block;width:200px;padding-top: 10px;">
				<div style="width: 200px;height:80px;line-height: 80px;float:left;">
					<Icon type="ios-camera" size="20"></Icon>
				</div>
			</Upload>
			<div>轮播图路径 : <span> {{bannerUrl}} </span></div>
		</div>
		

		
		<Modal title="View Image" v-model="visible">
			<img :src="path" v-if="visible" style="width: 100%">
		</Modal>
		<div style="padding-top: 50px;"><Button type="primary" @click="handleSubmit()">提交</Button></div>
	</div>
	   
</template>
<script>
    export default {
        data () {
            return {
                defaultList: [
                ],
                imgName: '',
                visible: false,
                uploadList: [],
				banerList: [],
				imageobject:{
					"status":"finished",
					"url":"https://image.axxo.top/game_icon/016.png",
				},
				path:'',
				id:"",
				logo:"",
				bannerUrl:""
            }
        },
        methods: {
            handleView (name) {
				console.log(name);
                this.path = name;
                this.visible = true;
            },
            handleRemove (file) {
				if(file =="1"){
					this.uploadList.splice(0);
					this.logo ='';
				}else{
					this.banerList.splice(0);
					this.bannerUrl ='';
				}
           /*     const fileList = this.$refs.upload.fileList;
                this.$refs.upload.fileList.splice(fileList.indexOf(file), 1); */
            },
            handleSuccess (res, file) {
				console.log(res);
				console.log(file);
 /*               file.url = res.url;
                file.name = res.name;
				this.imgName = res.name;
				this.path = res.url; */
				this.logo = res.url;
				res.status = "finished";
				this.uploadList.push(res)
            },
			handleSuccess1 (res, file) {
				console.log(res);
				console.log(file);
				this.bannerUrl = res.url;
				res.status = "finished";
				this.banerList.push(res)
/* 			    file.url = res.url;
			    file.name = res.name;
				this.imgName = res.name;
				this.path = res.url; */
			},
            handleFormatError (file) {
                this.$Notice.warning({
                    title: 'The file format is incorrect',
                    desc: 'File format of ' + file.name + ' is incorrect, please select jpg or png.'
                });
            },
            handleMaxSize (file) {
                this.$Notice.warning({
                    title: 'Exceeding file size limit',
                    desc: 'File  ' + file.name + ' is too large, no more than 2M.'
                });
            },
            handleBeforeUpload () {
                const check = this.uploadList.length < 1;
                if (!check) {
                    this.$Notice.warning({
                        title: '只可以提交1张图'
                    });
                }
                return check;
            },
			handleBeforeUpload1 () {
			    const check = this.banerList.length < 1;
			    if (!check) {
			        this.$Notice.warning({
			            title: '只可以提交1张图'
			        });
			    }
			    return check;
			},
			handleSubmit(){
				var that = this;
				this.https.fetchPost('/customerApp/contr/addLogoImages', {
				  id: that.id,        // 参数 firstName
				  url:that.path,
				  bannerUrl:that.bannerUrl,
				  logo:that.logo,
				})
				.then(function (response) {
					if(response.data.code == "200"){
						  that.$Message.success('操作成功!');
						  that.$router.push({path: "/customer_app_list"})
						  
					}else{
						  that.$Message.success('保存图片失败!');
					}
				})
				.catch(function (error) {
				  console.log(error);
				});
			}
        },
        mounted () {
			var that = this;
			that.id = this.$route.params.id;
			console.log("logo"+that.logo +","+"bannerUrl"+that.bannerUrl);
			if(this.$route.params.logo != undefined){
				that.logo = this.$route.params.logo;
				that.uploadList.push({"status":"finished","url":this.$route.params.logo});
			}
			if(this.$route.params.bannerUrl != undefined){
				that.bannerUrl = this.$route.params.bannerUrl;
				that.banerList.push({"status":"finished","url":that.bannerUrl});
			}
        }
    }
</script>
<style>
    .demo-upload-list{
        display: inline-block;
        width: 80px;
        height: 80px;
        text-align: center;
        line-height: 80px;
        border: 1px solid transparent;
        border-radius: 4px;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 20px;
        cursor: pointer;
        margin: 0 2px;
    }
</style>
