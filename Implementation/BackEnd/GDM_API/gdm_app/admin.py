from django.contrib import admin
from .models import Deadline, NormalUser, Project, ProjectManager, Task, TeamManager, TeamMember, Team

# Register your models here.
admin.site.register(NormalUser)
admin.site.register(Project)
admin.site.register(Task)
admin.site.register(Deadline)
admin.site.register(TeamMember)
admin.site.register(TeamManager)
admin.site.register(ProjectManager)
admin.site.register(Team)