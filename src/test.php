<?php
// 簡単な配列を生成します。
$array = array(1, 2, 3, 4, 5);
print_r($array);

// 全てのアイテムを削除しますが、配列自体は削除しないでおきます。
foreach ($array as $i => $value) {
    unset($array[$i]);
}
print_r($array);

// アイテムを追加します(新しい添え字は0ではなく
// 5となることに注意)
$array[] = 6;
print_r($array);

// 添え字を振りなおします。
$array = array_values($array);
$array[] = 7;
print_r($array);
?>
