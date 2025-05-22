// pages/api/revalidate.ts
// Create this file to enable on-demand revalidation from WordPress

import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.REVALIDATION_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    const { slug, action } = req.query
    
    if (action === 'revalidate-all') {
      // Revalidate the trails index page (if you have one)
      await res.revalidate('/trails')
      return res.json({ revalidated: true, message: 'All trails revalidated' })
    }
    
    if (slug) {
      // Revalidate specific trail page
      await res.revalidate(`/trails/${slug}`)
      console.log(`Revalidated trail: ${slug}`)
      return res.json({ revalidated: true, slug })
    }
    
    // If no specific slug, revalidate common pages
    await res.revalidate('/')
    return res.json({ revalidated: true, message: 'Homepage revalidated' })
    
  } catch (err) {
    console.error('Revalidation error:', err)
    return res.status(500).send('Error revalidating')
  }
}

// WordPress webhook integration:
// Add this to your WordPress functions.php or a plugin:

/*
// Add this to WordPress to trigger revalidation on post updates
function trigger_nextjs_revalidation($post_id) {
    // Only trigger for trail posts (adjust post type as needed)
    if (get_post_type($post_id) !== 'trail') {
        return;
    }
    
    $post = get_post($post_id);
    $slug = $post->post_name;
    
    $revalidation_url = 'https://yoursite.com/api/revalidate?secret=' . REVALIDATION_TOKEN . '&slug=' . $slug;
    
    wp_remote_post($revalidation_url, array(
        'timeout' => 10,
        'blocking' => false, // Don't wait for response
    ));
}

// Hook into post save/update events
add_action('save_post', 'trigger_nextjs_revalidation');
add_action('wp_trash_post', 'trigger_nextjs_revalidation');
add_action('untrash_post', 'trigger_nextjs_revalidation');
*/