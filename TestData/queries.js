
var queries = function() {

    this.qr1 = `SELECT firstname, lastname, email FROM users WHERE email = 'efewtrell8c@craigslist.org'`;
    this.qr1 = `SELECT firstname, lastname, role, email, name FROM users "u" INNER JOIN team "t"
    ON u.team_id = t.id`;
    this.qr3 = `Select firstname, lastname, email, role, name as teamname, batch_number as batchnumber, location
    from users u inner join team t
    on u.team_id = t.id join campus c
    on t.campus_id = c.id
    where role = 'student-team-leader' limit 5`;
}

module.exports = new queries();