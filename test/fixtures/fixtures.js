function _getAllBasedTerm() {
  return {
    organisations: [],
    tickets: [],
    users: [
      {
        _id: 75,
        url: "http://initech.zendesk.com/api/v2/users/75.json",
        external_id: "0db0c1da-8901-4dc3-a469-fe4b500d0fca",
        name: "Catalina Simpson",
        alias: "Miss Rosanna",
        created_at: "2016-06-07T09:18:00 -10:00",
        active: false,
        verified: true,
        shared: true,
        locale: "zh-CN",
        timezone: "US Minor Outlying Islands",
        last_login_at: "2012-10-15T12:36:41 -11:00",
        email: "rosannasimpson@flotonic.com",
        phone: "8615-883-099",
        signature: "Don't Worry Be Happy!",
        organization_id: 119,
        tags: ["Veguita","Navarre","Elizaville","Beaulieu"],
        suspended: true,
        role: "agent"
      }
    ]
  };
}
module.exports = {
  _getAllBasedTerm
};