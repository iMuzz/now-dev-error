import { gql } from 'apollo-boost'

export const CREATE_POST = gql`
  mutation($title: String!, $content: String!, $userId: uuid!) {
    insert_posts(objects: { content: $content, published: false, title: $title, user_id: $userId }) {
      returning {
        id
        content
        title
        published
        user_id
      }
    }
  }
`

export const DELETE_POST = gql`
  mutation($id: uuid!) {
    delete_posts(where: { id: { _eq: $id } }) {
      returning {
        id
      }
    }
  }
`

export const GET_POSTS = gql`
  query {
    posts {
      id
      title
      content
      published
      user_id
    }
  }
`

export const GET_LOGGED_IN = gql`
  query {
    isLoggedIn
  }
`

export const GET_INFLUENCERS = gql`
  query($isLive: Boolean) {
    influencers(where: { isLive: { _eq: $isLive } }) {
      id
      slug
      firstName
      lastName
      shortBio
      bio
      essayCount
      podcastCount
      tweetCount
      twitterScreenName
      videoCount
      website
      isLive
    }
  }
`

export const GET_PROFILE = gql`
  query($slug: String!) {
    influencers(where: { slug: { _eq: $slug } }) {
      id
      slug
      firstName
      lastName
      website
      picture
      bio
    }
  }
`

export const GET_TWEETS = gql`
  query($slug: String!, $limit: Int!, $offset: Int!) {
    tweets(
      where: { influencer: { slug: { _eq: $slug } }, in_reply_to_user_id: { _is_null: true } }
      limit: $limit
      offset: $offset
      order_by: { favorite_count: desc, id: asc }
    ) {
      id
      isStatusUpdate
      influencerId
      twitterUserId
      tweetId
      tweetUrlId
    }
  }
`

export const GET_ESSAYS = gql`
  query($slug: String!, $limit: Int!, $offset: Int!) {
    essays(
      where: { influencer: { slug: { _eq: $slug } }, blogpostRank: { _neq: -1 } }
      limit: $limit
      offset: $offset
      order_by: { blogpostRank: asc, id: asc }
    ) {
      id
      date
      title
      pageUrl
      blogpostRank
    }
  }
`

export const GET_VIDEOS = gql`
  query($slug: String!, $limit: Int!, $offset: Int!) {
    videos(
      where: { influencer: { slug: { _eq: $slug } } }
      limit: $limit
      offset: $offset
      order_by: { viewCount: desc, id: asc }
    ) {
      id
      youtubeId
      title
      description
      viewCount
      likeCount
    }
  }
`

export const GET_PODCASTS = gql`
  query($slug: String!, $limit: Int!, $offset: Int!) {
    podcasts(where: { influencer: { slug: { _eq: $slug } } }, limit: $limit, offset: $offset, order_by: { id: asc }) {
      id
      title
      thumbnail
      description
      podcastId
      audio
      listennotes_url
    }
  }
`

export const GET_USER = gql`
  query {
    user {
      id
      email
      first_name
      last_name
    }
  }
`

export const VERIFY_EMAIL = gql`
  mutation($email: String!, $email_verification_token: String!) {
    verifyEmail(email: $email, email_verification_token: $email_verification_token) {
      token
      is_successful
    }
  }
`

export const MUTATION_LOGOUT_USER = gql`
  mutation {
    logoutUser @client {
      userToken
    }
  }
`

export const MUTATION_SUBSCRIBE_INFLUENCER = gql`
  mutation($emailAddress: String!, $influencerId: uuid!) {
    insert_subscriptions(objects: { emailAddress: $emailAddress, influencerId: $influencerId }) {
      affected_rows
    }
  }
`

export const MUTATION_SUBSCRIBE_NEWSLETTER = gql`
  mutation($emailAddress: String!) {
    insert_newsletter(objects: { emailAddress: $emailAddress }) {
      affected_rows
    }
  }
`
