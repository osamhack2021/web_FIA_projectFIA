# Generated by Django 3.2.7 on 2021-09-25 23:04

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('board', '0002_auto_20210921_1324'),
    ]

    operations = [
        migrations.AddField(
            model_name='post',
            name='revised_at',
            field=models.DateTimeField(auto_now=True),
        ),
        migrations.AddField(
            model_name='post',
            name='tag',
            field=models.CharField(choices=[('else', '기타류'), ('army_uniform', '군복류'), ('running_shirts', '런닝'), ('underwear', '속옷'), ('underclothes', '내복'), ('socks', '양말'), ('towel', '수건'), ('caps', '모자류'), ('phones', '핸드폰'), ('books', '책'), ('stationery', '문방구')], default='else', max_length=20),
        ),
    ]
