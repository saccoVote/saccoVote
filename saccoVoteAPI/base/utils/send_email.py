from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string
from django.utils.html import strip_tags


def send_email(subject, recipient_list, template,
               context=None, from_email='saccovote@gmail.com', fail_silently=False):
    if context is None:
        context = {}
    html_content = render_to_string(template + '.html', context)
    text_content = strip_tags(html_content)
    email = EmailMultiAlternatives(subject, text_content, from_email=from_email, to=recipient_list)
    email.attach_alternative(html_content, "text/html")
    email.send(fail_silently=fail_silently)
