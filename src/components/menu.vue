<style scoped>
.layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
}
.layout-logo{
    width: 100px;
    height: 30px;
    background: #5b6270;
    border-radius: 3px;
    float: left;
    position: relative;
    top: 15px;
    left: 20px;
}
.layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
}
.layout-footer-center{
    text-align: center;
}
</style>
<template>
    <div class="layout">
        <Layout>
            <Header>
                <Menu mode="horizontal" theme="dark" active-name="1">
                    <div class="layout-logo"></div>
                </Menu>
            </Header>
            <Layout :style="{padding: '0 5px'}">
                <Content :style="{padding: '15px 0', minHeight: '280px', background: '#fff'}">
                    <Layout>
                        <Sider hide-trigger :style="{background: '#fff'}">
                            <Menu active-name="1-2" theme="light" width="auto" :open-names="['1']"  @on-select="route">
                                <Submenu name="1">
                                    <template slot="title">
                                        <Icon type="ios-navigate"></Icon>
                                        Item 1
                                    </template>
                                    <MenuItem name="my_app">小程序列表</MenuItem>
                                    <MenuItem name="customer_app" >客户小程序列表</MenuItem>
								</Submenu>
                            </Menu>
                        </Sider>
                        <Content :style="{minHeight: '950px',maxHeight: '950px',background: '#fff'}">
							<Breadcrumb :style="{margin: '0 0 0 15px'}">
							    <BreadcrumbItem>Home</BreadcrumbItem>
							    <BreadcrumbItem>{{title}}</BreadcrumbItem>
							</Breadcrumb>
                              <!-- 添加 -->
							<router-view>
							  <!-- 内容渲染在这里 -->
							</router-view>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
            <Footer class="layout-footer-center">2011-2016 &copy; TalkingData</Footer>
        </Layout>
    </div>
</div>
</template>
<script>
	
	
    export default {
		
		 data () {
			return {
				title:"test"
			}
		},
		methods:{
			route(res){
				console.log(res);
				this.$router.push('/'+res)
			}
		}
			
        
    }
</script>
