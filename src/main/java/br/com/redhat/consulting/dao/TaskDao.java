package br.com.redhat.consulting.dao;

import java.util.List;

import javax.enterprise.context.RequestScoped;
import javax.persistence.Query;
import javax.persistence.TypedQuery;

import br.com.redhat.consulting.config.TransactionalMode;
import br.com.redhat.consulting.model.Task;
import br.com.redhat.consulting.model.filter.TaskSearchFilter;

@RequestScoped
public class TaskDao extends BaseDao<Task, TaskSearchFilter> {

    protected void configQuery(StringBuilder query, TaskSearchFilter filter, List<Object> params) {
        if (filter.getId() != null) {
            query.append(" and ENT.id = ? ");
            params.add(filter.getId());
        }
        
        if (filter.getProject() != null && filter.getProject().getId() != null) {
            query.append(" and ENT.project.id = ? ");
            params.add(filter.getProject().getId());
        }
        
        if (filter.getTaskType() != null) {
            query.append(" and ENT.taskType = ? ");
            params.add(filter.getTaskType());
        }
        query.append(getOrderBy());
    }
    
    
    @TransactionalMode
    public void removeById(List<Integer> tasksToRemove) {
        if (tasksToRemove != null && tasksToRemove.size() > 0) {
            
            try {
                String jql = "delete from Task t where t.id in (";
                for (int i = 0; i < tasksToRemove.size(); i++) {
                    jql += "?" + i;
                    if (i+1 < tasksToRemove.size()) 
                        jql += ",";
                }
                jql += ")";
                Query query = getEntityManager().createQuery(jql);
                for (int i = 0; i < tasksToRemove.size(); i++) {
                    query.setParameter(i, tasksToRemove.get(i));
                }
                int nr = query.executeUpdate();
            } catch (Exception e) {
                e.printStackTrace();
            }
        }
    }
    
    @TransactionalMode
    public List<Task> findByConsultantAndProject(Integer projectId, Integer consultantId) {
        String jql = "select distinct t from Task t inner join t.consultants c where c.id = :consultantId and t.project.id = :projectId";
        TypedQuery<Task> query = getEntityManager().createQuery(jql, Task.class);
        
        query.setParameter("consultantId", consultantId);
        query.setParameter("projectId", projectId);
        
        List<Task> res = query.getResultList();
        return res;
    }


    public void associateTasks(Integer consultantId, Integer taskId) {
        // bypass entitymanager to insert the relation data directly into 
        // the relation table person_task
        // otherwise, it would require the load of each task and person, and subsequent update operations and inserts
        
    }

}
