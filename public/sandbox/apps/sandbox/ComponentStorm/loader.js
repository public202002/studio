window.onload = function() {
  // Code to load your module here
    import('./ComponentStorm.js').then(module => {
    // Module loaded successfully
    console.log('ComponentStorm.js loaded.');
    // You can access module exports like module.exportName
    console.log(module.hello);
  }).catch(err => {
    // Handle errors during module loading
    console.error('Failed to load ComponentStorm.js:', err);
  });

};