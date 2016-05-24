# backbone.validationを使ったサンプルアプリ
* https://github.com/thedersen/backbone.validation

### サンプルの動かし方
* cloneするかzipをダウンロードして、app/index.htmlを起動すえれば動きます
 * 編集せずに動かすだけであればこちらの方がだいぶ軽いです
   https://github.com/ozaki25/backbone_validation_sample/tree/bootstrap_without_node_modules

### 前提
* bootstrapのformを使用している場合のエラーの表示のしかた解説している
  * エラーの表示部分は以下を参考にカスタマイズ
  https://gist.github.com/driehle/2909552
* backbone.marionetteを使ってアプリを作っている
  * validation部分のみであればmarionetteを意識しなくても流用できるはず
* gulpでbrowserifyを実行しファイルを統合している
  * app/scripts/app.jsが作成されるファイルでそれをindex.htmlで読み込んでいる

### アプリの内容
* ユーザ登録のフォームがありNameとAgeを入力して登録する
  * Nameは必須項目
  * Ageは1~100
* 入力内容が条件を満たさなければユーザにエラーを伝える
* 登録したユーザは画面下部に羅列されていく

### やること
1. modelにバリデーションを定義する
2. htmlをバリデーションに対応づける
3. バリデーションの実行部分を作る
4. バリデーション完了後の処理を作る

### バリデーションの定義
* バリデーションの定義はモデルで行う
https://github.com/ozaki25/backbone_validation_sample/blob/bootstrap/app/scripts/models/User.js#L4
  <pre>
    validation: {
        name: {
            required: true,
            msg: '必須項目です。'
        },
        age: {
            range: [0, 100],
            msg: '0〜100を入力して下さい。'
        }
    }
  </pre>
* nameについてはrequiredで必須項目を、msgでエラー時のメッセージを定義している
* ageについてはrangeで数値の範囲内であることを、msgでエラー時のメッセージを定義している
* バリデーションの項目については様々あるので公式サイトを参考にして下さい
https://github.com/thedersen/backbone.validation#built-in-validators
  * 個人的にはコードを見た方がしっくりくる
  https://github.com/thedersen/backbone.validation/blob/master/dist/backbone-validation.js#L578

### htmlをバリデーションに対応させる
* validationで定義した項目をhtmlのinputと紐付けておく必要があります
* inputフィールドのnameと上記validationで定義した項目名（ここではnameとage）を一致させます
  <pre>`<input type="text" class="form-control name" name="name">`</pre>
  <pre>`<input type="text" class="form-control age" name="age">`</pre>
  https://github.com/ozaki25/backbone_validation_sample/blob/bootstrap/app/index.html#L34

### バリデーションの実行
* フォームのsubmitボタンが押された時にバリデーションを実行する
  * コードでいうとここ
  https://github.com/ozaki25/backbone_validation_sample/blob/bootstrap/app/scripts/views/BasicFormView.js#L18
* バリデーションを働かせるには対象のオブジェクトをnewしたあとにbindする必要があります
  * ここの話
  https://github.com/thedersen/backbone.validation#validation-binding
  * ここではsubmitをクリックする度に新しいUserモデルのオブジェクトをnewしてbindしています(bind処理はメソッド化(bindBackboneValidation)して外出ししてる)
  https://github.com/ozaki25/backbone_validation_sample/blob/bootstrap/app/scripts/views/BasicFormView.js#L21
* Backbone.Validation.bind(this)とすることで、そのviewに紐付いているmodel(this.model)がバリデーションの対象となります
  * ここではbindの第二引数に長々書いていますがここは後ほど説明します
* modelにデータをセット
  * 事前準備ができたのでmodelに値をセットします(.set()だからまだ永続化されていない(.save()だとこの時点で保存されてしまう))
    <pre>this.model.set({name: name, age: age});</pre>
* エラーがないかチェックする
  * this.model.isValid(true)とすることでsetした値が条件を満たしているかどうか真偽値で返されます
  <pre>if(this.model.isValid(true))</pre>
  * if文に入れることで条件を満たした場合とそうでない場合の処理を分けていきます
* エラー時の処理
  * バリデーションのチェックが完了した後の処理はbind時の第二引数の部分で定義しています
  * validに正常時の動作を、invalidにエラー時の動作を記述します
    * これらのメソッドのデフォルトは以下のようになっていますが、bootstrapに対応できるように上書きします
      https://github.com/thedersen/backbone.validation/blob/master/dist/backbone-validation.js#L432
  * validとinvalidの内容
    * 基本的にinvalidでエラーメッセージを表示し、validで削除している
    * 今回のサンプルでは4パターン用意している

### サンプルアプリで用意している内容
#### BasicForm
http://getbootstrap.com/css/#forms-example
* BasicFormではシンプルなフォームの場合の例です
* 入力域の下にエラーメッセージを表示します
  https://github.com/ozaki25/backbone_validation_sample/blob/bootstrap/app/scripts/views/BasicFormView.js#L31
 
 <img src=./images/BasicForm.png height=300px>

#### HorizontalForm
http://getbootstrap.com/css/#forms-horizontal
* HorizontalFormではラベルと入力域が横並びの場合の例です
* BasicFormと同様に入力域の下にエラーメッセージを表示します
  https://github.com/ozaki25/backbone_validation_sample/blob/bootstrap/app/scripts/views/HorizontalFormView.js#L31

  <img src=./images/HorizontalForm.png height=300px>

#### InlineForm
http://getbootstrap.com/css/#forms-inline
* InlineFormは複数の入力域が横並びの場合の例です
* それぞれ入力域の右にエラーメッセージを表示します
  https://github.com/ozaki25/backbone_validation_sample/blob/bootstrap/app/scripts/views/InlineFormView.js#L31
 
 <img src=./images/InlineForm.png height=100px>

#### BasicFormWithTooltip
* 最後はおまけです
* BasicFormと同じフォームですが、エラーメッセージをツールチップで出す場合の例です
* 条件を満たしていない入力域にツールチップを付与してそこにエラーメッセージを表示します
  https://github.com/ozaki25/backbone_validation_sample/blob/bootstrap/app/scripts/views/BasicFormWithTooltipView.js#L31

 <img src=./images/BasicFormWithTooltip.png height=300px>
