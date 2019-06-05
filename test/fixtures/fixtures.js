function _getAllBasedTerm() {
  return {
    all_relating_information: {
      organisations: [],
      tickets: [
        {
          _id: "30094238-46cd-4921-b1c1-4757906cd028",
          assignee_id: 41,
          created_at: "2016-03-24T10:39:29 -11:00",
          description:
            "Mollit dolor laborum elit aliquip ipsum est reprehenderit. Voluptate id laborum Lorem excepteur do velit cupidatat culpa est magna exercitation aliquip.",
          due_at: "2016-08-10T10:10:33 -10:00",
          external_id: "c6039df7-28e1-48db-88b3-4e0575ef4de0",
          has_incidents: true,
          organization_id: 120,
          priority: "high",
          status: "open",
          subject: "A Catastrophe in Bahamas",
          submitter_id: 34,
          tags: ["Guam", "Colorado", "Washington", "Wyoming"],
          type: "question",
          url:
            "http://initech.zendesk.com/api/v2/tickets/30094238-46cd-4921-b1c1-4757906cd028.json",
          via: "voice"
        }[Function]
      ],
      users: []
    }
  };
}
function _getUserFilteredOnName() {
  return {
    user: [
      {
        _id: 44,
        url: "http://initech.zendesk.com/api/v2/users/44.json",
        external_id: "b5d38224-29c5-4aea-81a4-0da83d0a3f80",
        name: "John Floyd",
        alias: "Mr Gonzales",
        created_at: "2016-06-08T10:26:06 -10:00",
        active: false,
        verified: false,
        shared: false,
        locale: "de-CH",
        timezone: "Hong Kong",
        last_login_at: "2014-11-04T08:34:49 -11:00",
        email: "gonzalesfloyd@flotonic.com",
        phone: "9894-382-253",
        signature: "Don't Worry Be Happy!",
        tags: ["Dunlo", "Greer", "Crown", "Strong"],
        suspended: false,
        role: "end-user"
      }
    ],
    ticket_related_information: [
      { related_organisations: [], related_users: [] }
    ]
  };
}
function _getTemplateBySubject() {
  return {
    ticket: [
      {
        _id: "30094238-46cd-4921-b1c1-4757906cd028",
        url:
          "http://initech.zendesk.com/api/v2/tickets/30094238-46cd-4921-b1c1-4757906cd028.json",
        external_id: "c6039df7-28e1-48db-88b3-4e0575ef4de0",
        created_at: "2016-03-24T10:39:29 -11:00",
        type: "question",
        subject: "A Catastrophe in Bahamas",
        description:
          "Mollit dolor laborum elit aliquip ipsum est reprehenderit. Voluptate id laborum Lorem excepteur do velit cupidatat culpa est magna exercitation aliquip.",
        priority: "high",
        status: "open",
        submitter_id: 34,
        assignee_id: 41,
        organization_id: 120,
        tags: ["Guam", "Colorado", "Washington", "Wyoming"],
        has_incidents: true,
        due_at: "2016-08-10T10:10:33 -10:00",
        via: "voice"
      }
    ],
    ticket_related_information: [
      {
        related_organisations: [
          {
            _id: 120,
            created_at: "2016-01-15T04:11:08 -11:00",
            details: "MegaCorp",
            domain_names: [
              "valpreal.com",
              "puria.com",
              "bostonic.com",
              "roughies.com"
            ],
            external_id: "82da5daf-d6ad-484d-a831-05cd3e2baea5",
            name: "Andershun",
            shared_tickets: false,
            tags: ["Robinson", "Santana", "Whitehead", "England"],
            url: "http://initech.zendesk.com/api/v2/organizations/120.json"
          }
        ],
        related_users: [
          {
            _id: 35,
            active: false,
            alias: "Mr Carpenter",
            created_at: "2016-03-18T07:23:10 -11:00",
            email: "carpenterburke@flotonic.com",
            external_id: "46c880dd-d07e-4fd0-87d0-e92c167d029e",
            last_login_at: "2015-12-17T10:43:55 -11:00",
            locale: "en-AU",
            name: "Brôôks Burke",
            organization_id: 120,
            phone: "8644-152-064",
            role: "agent",
            shared: true,
            signature: "Don't Worry Be Happy!",
            suspended: true,
            tags: ["Conway", "Linwood", "Greenwich", "Suitland"],
            timezone: "Svalbard and Jan Mayen Islands",

            url: "http://initech.zendesk.com/api/v2/users/35.json",
            verified: false
          }
        ]
      }
    ]
  };
}

module.exports = {
  _getAllBasedTerm,
  _getUserFilteredOnName,
  _getTemplateBySubject
};
