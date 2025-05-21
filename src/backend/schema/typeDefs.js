// GraphQL schema definition for the Architekt kúziel application
const typeDefs = `
  # User related types
  enum UserRole {
    ADMIN
    EDITOR
    USER
  }

  type User {
    id: ID!
    email: String!
    name: String!
    role: UserRole!
    createdAt: String!
    updatedAt: String!
  }

  input CreateUserInput {
    email: String!
    password: String!
    name: String!
    role: UserRole
  }

  input UpdateUserInput {
    email: String
    name: String
    role: UserRole
  }

  # Content related types
  enum ContentStatus {
    DRAFT
    PUBLISHED
  }

  enum ContentFormat {
    TEXT
    HTML
    MARKDOWN
  }

  type Content {
    id: ID!
    title: String!
    body: String!
    format: ContentFormat!
    status: ContentStatus!
    author: User!
    tags: [Tag!]!
    createdAt: String!
    updatedAt: String!
  }

  input CreateContentInput {
    title: String!
    body: String!
    format: ContentFormat!
    status: ContentStatus
    tagIds: [ID!]
  }

  input UpdateContentInput {
    title: String
    body: String
    format: ContentFormat
    status: ContentStatus
    tagIds: [ID!]
  }

  # Tag related types
  enum TagType {
    CATEGORY
    TAG
    SYSTEM
  }

  type Tag {
    id: ID!
    name: String!
    type: TagType!
    createdAt: String!
  }

  input CreateTagInput {
    name: String!
    type: TagType!
  }

  # Interaction related types
  enum InteractionType {
    VIEW
    EDIT
    SHARE
    LIKE
  }

  type Interaction {
    id: ID!
    user: User!
    content: Content!
    type: InteractionType!
    metadata: String
    createdAt: String!
  }

  input CreateInteractionInput {
    contentId: ID!
    type: InteractionType!
    metadata: String
  }

  # Notification related types
  enum NotificationType {
    SYSTEM
    CONTENT
    COLLABORATION
  }

  type Notification {
    id: ID!
    user: User!
    type: NotificationType!
    message: String!
    read: Boolean!
    metadata: String
    createdAt: String!
  }

  # Collaboration related types
  enum CollaborationRole {
    OWNER
    EDITOR
    VIEWER
  }

  type Collaboration {
    id: ID!
    content: Content!
    user: User!
    role: CollaborationRole!
    createdAt: String!
    updatedAt: String!
  }

  input CreateCollaborationInput {
    contentId: ID!
    userId: ID!
    role: CollaborationRole!
  }

  # Dashboard related types
  enum WidgetType {
    RECENT_ACTIVITY
    QUICK_ACCESS
    RECOMMENDATIONS
    NOTIFICATIONS
    ANALYTICS
    CUSTOM
  }

  enum WidgetSize {
    SMALL
    MEDIUM
    LARGE
  }

  type Widget {
    id: ID!
    title: String!
    type: WidgetType!
    size: WidgetSize!
    position: Int!
    config: String
    user: User!
    createdAt: String!
    updatedAt: String!
  }

  input CreateWidgetInput {
    title: String!
    type: WidgetType!
    size: WidgetSize!
    position: Int!
    config: String
  }

  input UpdateWidgetInput {
    title: String
    type: WidgetType
    size: WidgetSize
    position: Int
    config: String
  }

  # AI/ML related types
  type ContentSuggestion {
    id: ID!
    content: Content!
    suggestion: String!
    type: String!
    applied: Boolean!
    createdAt: String!
  }

  type PromptSuggestion {
    id: ID!
    text: String!
    type: String!
    score: Float!
  }

  # Query type
  type Query {
    # User queries
    me: User
    user(id: ID!): User
    users: [User!]!

    # Content queries
    content(id: ID!): Content
    contents(status: ContentStatus, tagIds: [ID!], search: String): [Content!]!
    recentContents(limit: Int): [Content!]!

    # Tag queries
    tag(id: ID!): Tag
    tags(type: TagType): [Tag!]!

    # Notification queries
    notifications(read: Boolean): [Notification!]!

    # Widget queries
    widgets: [Widget!]!

    # AI/ML queries
    contentSuggestions(contentId: ID!): [ContentSuggestion!]!
    promptSuggestions(input: String!): [PromptSuggestion!]!
  }

  # Mutation type
  type Mutation {
    # Auth mutations
    login(email: String!, password: String!): AuthPayload!
    register(input: CreateUserInput!): AuthPayload!
    
    # User mutations
    updateUser(id: ID!, input: UpdateUserInput!): User!
    deleteUser(id: ID!): Boolean!
    
    # Content mutations
    createContent(input: CreateContentInput!): Content!
    updateContent(id: ID!, input: UpdateContentInput!): Content!
    deleteContent(id: ID!): Boolean!
    
    # Tag mutations
    createTag(input: CreateTagInput!): Tag!
    deleteTag(id: ID!): Boolean!
    
    # Interaction mutations
    createInteraction(input: CreateInteractionInput!): Interaction!
    
    # Notification mutations
    markNotificationAsRead(id: ID!): Notification!
    markAllNotificationsAsRead: Boolean!
    
    # Collaboration mutations
    createCollaboration(input: CreateCollaborationInput!): Collaboration!
    deleteCollaboration(id: ID!): Boolean!
    
    # Widget mutations
    createWidget(input: CreateWidgetInput!): Widget!
    updateWidget(id: ID!, input: UpdateWidgetInput!): Widget!
    deleteWidget(id: ID!): Boolean!
    
    # AI/ML mutations
    applyContentSuggestion(id: ID!): Content!
    generateContentSuggestions(contentId: ID!): [ContentSuggestion!]!
  }

  # Auth payload
  type AuthPayload {
    token: String!
    user: User!
  }

  # Subscription type
  type Subscription {
    notificationAdded: Notification!
    contentUpdated(id: ID!): Content!
  }
`;

module.exports = typeDefs;
