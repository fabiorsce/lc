from mezzanine import template
from mezzanine.generic.models import ThreadedComment

register = template.Library()

@register.assignment_tag
def get_recent_comments(num):
    return ThreadedComment.objects.all().select_related(depth=1) \
                                  .order_by("-id")[:num]