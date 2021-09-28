# Generated by Django 3.2.7 on 2021-09-28 14:18

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Post',
            fields=[
                ('id', models.AutoField(primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=100)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('revised_at', models.DateTimeField(auto_now=True)),
                ('username', models.CharField(max_length=100)),
                ('body', models.TextField()),
                ('tag', models.CharField(choices=[('else', '기타류'), ('army_uniform', '군복류'), ('running_shirts', '런닝'), ('underwear', '속옷'), ('underclothes', '내복'), ('socks', '양말'), ('shoes', '신발류'), ('towel', '수건'), ('caps', '모자류'), ('phones', '핸드폰'), ('books', '책'), ('stationery', '문방구')], default='else', max_length=20)),
                ('place', models.TextField(max_length=500)),
                ('board_type', models.CharField(choices=[('pick_up', '찾아가세요'), ('request', '찾아주세요')], default='pick_up', max_length=30)),
                ('user', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
