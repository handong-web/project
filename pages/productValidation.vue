<template>
    <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
    >
        <el-form-item label="邮箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
        </el-form-item>
        <el-form-item label="数字" prop="number">
            <el-input v-model="ruleForm.number"></el-input>
        </el-form-item>
        <el-form-item label="身份证" prop="idcard">
            <el-input v-model="ruleForm.idcard"></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone">
            <el-input v-model="ruleForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码强度" prop="password">
            <el-input v-model="ruleForm.password"></el-input>
        </el-form-item>
        <el-form-item label="QQ号码" prop="qq">
            <el-input v-model="ruleForm.qq"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
                >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
export default {
    data() {
        var checkEmail = (rule, value, callback) => {
            if (this.comsys.notNull(value)) {
                return callback(new Error('邮箱不能为空！'))
            }
            if (!this.comsys.email(value)) {
                return callback(new Error('邮箱格式不正确！'))
            }
        }
        var checkNumber = (rule, value, callback) => {
            if (this.comsys.notNull(value)) {
                return callback(new Error('数字不能为空！'))
            }
            if (!this.comsys.onlyNumber(value)) {
                return callback(new Error('只能输入数字！'))
            }
        }
        var checkIDcard = (rule, value, callback) => {
            if (this.comsys.notNull(value)) {
                return callback(new Error('身份证不能为空！'))
            }
            if (!this.comsys.IDCard(value)) {
                return callback(new Error('请输入有效的身份证！'))
            }
        }
        var checkPhone = (rule, value, callback) => {
            if (this.comsys.notNull(value)) {
                return callback(new Error('手机号不能为空！'))
            }
            if (!this.comsys.phone(value)) {
                return callback(new Error('请输入有效的手机号码！'))
            }
        }
        var checkPassword = (rule, value, callback) => {
            if (this.comsys.notNull(value)) {
                return callback(new Error('密码不能为空！'))
            }
            if (!this.comsys.passWord(value)) {
                return callback(
                    new Error(
                        '最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符！'
                    )
                )
            }
        }
        var checkQQ = (rule, value, callback) => {
            if (this.comsys.notNull(value)) {
                return callback(new Error('QQ号不能为空！'))
            }
            if (!this.comsys.qq(value)) {
                return callback(new Error('请输入有效的QQ号码！'))
            }
        }

        return {
            ruleForm: {
                email: '',
                number: '',
                idcard: '',
                phone: '',
                password: '',
                qq: ''
            },
            rules: {
                email: [{ validator: checkEmail, trigger: 'blur' }],
                number: [{ validator: checkNumber, trigger: 'blur' }],
                idcard: [{ validator: checkIDcard, trigger: 'blur' }],
                phone: [{ validator: checkPhone, trigger: 'blur' }],
                password: [{ validator: checkPassword, trigger: 'blur' }],
                qq: [{ validator: checkQQ, trigger: 'blur' }]
            }
        }
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate(valid => {
                if (valid) {
                    alert('submit!')
                } else {
                    console.log('error submit!!')
                    return false
                }
            })
        },
        resetForm(formName) {
            this.$refs[formName].resetFields()
        }
    }
}
</script>