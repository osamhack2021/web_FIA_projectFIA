from rest_framework import pagination
from rest_framework.response import Response
from collections import OrderedDict

class CustomPagination(pagination.PageNumberPagination): 
    def get_paginated_response(self, data):
        return Response(OrderedDict([
                ('count', self.page.paginator.count),
                ('next', self.get_next_link()),
                ('previous', self.get_previous_link()),
                ('data', data)
                ])
                )