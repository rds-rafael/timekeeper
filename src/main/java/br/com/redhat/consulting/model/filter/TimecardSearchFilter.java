package br.com.redhat.consulting.model.filter;

import java.util.Date;

import br.com.redhat.consulting.model.Timecard;

public class TimecardSearchFilter extends Timecard {

    private Date initDate;
    private Date endDate;
    
    public Date getInitDate() {
        return initDate;
    }
    public void setInitDate(Date initDate) {
        this.initDate = initDate;
    }
    public Date getEndDate() {
        return endDate;
    }
    public void setEndDate(Date endDate) {
        this.endDate = endDate;
    }
    
    
    
}
