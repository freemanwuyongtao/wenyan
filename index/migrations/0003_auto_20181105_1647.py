# -*- coding: utf-8 -*-
# Generated by Django 1.11.8 on 2018-11-05 08:47
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('index', '0002_texts_isdelete'),
    ]

    operations = [
        migrations.CreateModel(
            name='Focus',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('focus_id', models.IntegerField()),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='index.User')),
            ],
            options={
                'db_table': 'focus',
            },
        ),
        migrations.CreateModel(
            name='Pinlun',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('load', models.TextField(null=True)),
                ('comment_user', models.CharField(max_length=30)),
                ('time', models.CharField(max_length=30)),
                ('text', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='index.Texts')),
            ],
            options={
                'db_table': 'pinlun',
            },
        ),
        migrations.RemoveField(
            model_name='comment',
            name='author',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='comment_usr',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='load',
        ),
        migrations.RemoveField(
            model_name='comment',
            name='time',
        ),
    ]
