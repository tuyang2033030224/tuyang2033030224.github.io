'使用严格';

函数解密AES（密码）{

  尝试 {

    var DecryptionError = String(document.getElementById('decryptionError').innerHTML);
    var noContentError = String(document.getElementById('noContentError').innerHTML);

  }赶上（e）{

    解密错误 = '密码错误！';
    noContentError = '没有要显示的内容！';

  }

  尝试 {

    让 content = CryptoJS.AES.decrypt(document.getElementById('encrypt-blog').innerHTML.trim(), password);
    content = content.toString(CryptoJS.enc.Utf8);
    内容 = decodeBase64（内容）；
    内容 = unescape(内容);
    如果（内容===''）{

      抛出新错误（noContentError）；// ???

    } 别的 {

      document.getElementById('encrypt-blog').style.display = 'inline';
      document.getElementById('加密博客').innerHTML = '';

      // 使用jquery加载一些js代码
      尝试 {

        $('#encrypt-blog').html(content);

        // 这里没有样式改变

        // 这里没有样式改变

      }赶上（e）{

        const errorInfo = '<p>'
          + '发生了一些错误，请检查原始文件。'
          + '详细的异常显示在控制台中。'
          + '</p>';
        控制台错误（e）；
        $('#encrypt-blog').html(errorInfo);

      }

      document.getElementById('hbe-security').style.display = 'none';
      如果 (document.getElementById('toc-div')) {

        document.getElementById('toc-div').style.display = 'inline';

      }

    }

    // 调用 MathJax 进行渲染
    if (typeof MathJax !== 'undefined') {

      尝试 {

        MathJax.Hub.Queue(
          ['resetEquationNumbers', MathJax.InputJax.TeX,],
          ['预处理'，MathJax.Hub，]，
          ['重新处理'，MathJax.Hub，]
        );

      }赶上（e）{

        console.log('不能用 MathJax 渲染');

      }

    }

  }赶上（e）{

    警报（解密错误）；
    控制台日志（e）；
    返回假；

  }

  返回真；

}

函数 htmlDecode(str) {

  让 s = '';
  如果（字符串长度== 0）{

    返回 '​​';

  }

  s = str.replace(/>/g, '&');
  s = s.replace(/</g, '<');
  s = s.replace(/>/g, '>');
  s = s.replace(/ /g, ' '); // ??? 为什么不 ' '
  s = s.replace(/'/g, '\'');
  s = s.replace(/"/g, '"');
  s = s.replace(/<br>/g, '\n');
  返回 s;

}

功能 decodeBase64（内容）{

  内容 = CryptoJS.enc.Base64.parse(content);
  内容 = CryptoJS.enc.Utf8.stringify(content);
  返回内容；

}

函数 setCookie(cookieName, cookieValue, expireMinutes) {

  const expireTime = new Date(new Date().getTime() + 1000 * 60 * expireMinutes);
  document.cookie = `${cookieName}=${escape(cookieValue)}${expireMinutes == null ? '' : `;expires=${expireTime.toGMTString()}`}`;

}

函数 getCookie(cookieName) {

  如果（document.cookie.length > 0）{

    让 idx = document.cookie.indexOf(`${cookieName}=`);
    如果（idx！= -1）{

      idx = idx + cookieName.length + 1;
      让 idy = document.cookie.indexOf(';', idx);
      如果（idy == -1）{

        idy = document.cookie.length;

      }
      返回 unescape(document.cookie.substring(idx, idy));

    }

  }
  返回 '​​';

}

函数 GetUrlRelativePath() {

  const url = document.location.toString();
  const arrUrl = url.split('//');

  const start = arrUrl[1].indexOf('/');
  让 relUrl = arrUrl[1].substring(start);

  如果 (relUrl.indexOf('?') != -1) {

    relUrl = relUrl.split('?')[0];

  }
  返回 relUrl;

}

函数 GenerateCookieName() {

  const COOKIE_NAME = 'HBE-PASSWORD';
  返回 COOKIE_NAME + GetUrlRelativePath();

}

// 因为你决定使用 jQuery。
$（文件）。准备好（
  功能 （） {
    让密码 = String(getCookie(GenerateCookieName()));
    console.log(`从 Cookie 中获取密码：${password}`);

    如果（密码！= ''）{

      如果（！解密AES（密码））{
        // 删除cookie
        setCookie（COOKIE_NAME，密码，-5）；
      } 别的 {

        document.getElementById('encrypt-blog').removeAttribute('style');

        $("#encrypt-blog").justifiedGallery({margins: 5, rowHeight: 150});
      }
    }
    document.getElementById('pass').onkeypress = function (keyPressEvent) {

      密码 = String(document.getElementById('pass').value);
      如果（keyPressEvent.keyCode === 13）{

        常量结果 = 解密AES（密码）；

        如果（结果）{
          document.getElementById('encrypt-blog').removeAttribute('style');

          $("#encrypt-blog").justifiedGallery({margins: 5, rowHeight: 150});

          setCookie(GenerateCookieName(), 密码, 30);
        }
      }
    };
    $('#btn_decrypt').on('click', function () {

      密码 = String(document.getElementById('pass').value);

      常量结果 = 解密AES（密码）；

      如果（结果）{

        document.getElementById('encrypt-blog').removeAttribute('style');

        $("#encrypt-blog").justifiedGallery({margins: 5, rowHeight: 150});

        setCookie(GenerateCookieName(), 密码, 30);
      }
    });
  }
);