$(function() {
    $('#link_reg').on('click', function() {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function() {
        $('.login-box').show()
        $('.reg-box').hide()
    })

    //自定义校验规则
    var form = layui.form
    var layer = layui.layer
    form.verify({
            pass: [
                /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
            ],

            repwd(value) {
                const pwd = $('.reg-box [name = password]').val()
                if (value !== pwd) {
                    return '两次密码不一致'
                }
            }
        })
        //注册功能
    $('#form_reg').on('submit', function(e) {
        e.preventDefault();
        $.ajax({
            url: '/api/reguser',
            method: 'POST',
            data: {
                username: $('.reg-box [name=username]').val(),
                password: $('.reg-box [name=password]').val()
            },
            success(res) {
                if (res.status !== 0) {
                    layer.msg(res.message || "注册失败");
                    return;
                }
                layer.msg('注册成功');
                $('#link_login').click();
            }
        })
    })
    $('#form_login').submit(function(e) {
        e.preventDefault()
        $.ajax({
            url: '/api/login',
            method: 'POST',
            data: $(this).serialize(),
            success(res) {
                if (res.status !== 0) {
                    layer.msg(res.message || '登陆失败')
                    return
                }
                layer.msg('登陆成功')
                localStorage.setItem('token', res.token)
                location.href = '/index1.html'
            }
        })
    })
})